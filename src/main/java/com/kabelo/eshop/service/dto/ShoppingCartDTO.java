package com.kabelo.eshop.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.kabelo.eshop.domain.ShoppingCart} entity.
 */
public class ShoppingCartDTO implements Serializable {

    private Long id;

    private Integer quantity;

    private ShopUserDTO shopUser;

    private ProductDTO product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ShopUserDTO getShopUser() {
        return shopUser;
    }

    public void setShopUser(ShopUserDTO shopUser) {
        this.shopUser = shopUser;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShoppingCartDTO)) {
            return false;
        }

        ShoppingCartDTO shoppingCartDTO = (ShoppingCartDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, shoppingCartDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ShoppingCartDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", shopUser=" + getShopUser() +
            ", product=" + getProduct() +
            "}";
    }
}
