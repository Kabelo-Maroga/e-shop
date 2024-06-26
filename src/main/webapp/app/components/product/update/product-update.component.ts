import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Category } from 'app/components/enumerations/category.model';
import { IProduct, Product } from '../product.model';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  categoryValues = Object.keys(Category);

  editForm = this.fb.group({
    id: [],
    category: [],
    title: [],
    price: [],
    imageUrl: [],
  });

  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      if (this.productService.selectedProduct) {
        this.updateForm(this.productService.selectedProduct);
      }
    });
  }

  previousState(): void {
    this.productService.modalRef?.close();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    this.productService.selectedProduct = product;
    if (product.id !== null) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['product']);
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      category: product.category,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  }

  protected createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      category: this.editForm.get(['category'])!.value,
      title: this.editForm.get(['title'])!.value,
      price: this.editForm.get(['price'])!.value,
      imageUrl: this.editForm.get(['imageUrl'])!.value,
    };
  }
}
