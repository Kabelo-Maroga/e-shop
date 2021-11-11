package com.kabelo.eshop.web.rest;

import com.kabelo.eshop.repository.ShopUserRepository;
import com.kabelo.eshop.service.ShopUserService;
import com.kabelo.eshop.service.dto.ShopUserDTO;
import com.kabelo.eshop.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.kabelo.eshop.domain.ShopUser}.
 */
@RestController
@RequestMapping("/api")
public class ShopUserResource {

    private final Logger log = LoggerFactory.getLogger(ShopUserResource.class);

    private static final String ENTITY_NAME = "shopUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ShopUserService shopUserService;

    private final ShopUserRepository shopUserRepository;

    public ShopUserResource(ShopUserService shopUserService, ShopUserRepository shopUserRepository) {
        this.shopUserService = shopUserService;
        this.shopUserRepository = shopUserRepository;
    }

    /**
     * {@code POST  /shop-users} : Create a new shopUser.
     *
     * @param shopUserDTO the shopUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new shopUserDTO, or with status {@code 400 (Bad Request)} if the shopUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/shop-users")
    public ResponseEntity<ShopUserDTO> createShopUser(@RequestBody ShopUserDTO shopUserDTO) throws URISyntaxException {
        log.debug("REST request to save ShopUser : {}", shopUserDTO);
        if (shopUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new shopUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShopUserDTO result = shopUserService.save(shopUserDTO);
        return ResponseEntity
            .created(new URI("/api/shop-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /shop-users/:id} : Updates an existing shopUser.
     *
     * @param id the id of the shopUserDTO to save.
     * @param shopUserDTO the shopUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shopUserDTO,
     * or with status {@code 400 (Bad Request)} if the shopUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the shopUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/shop-users/{id}")
    public ResponseEntity<ShopUserDTO> updateShopUser(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ShopUserDTO shopUserDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ShopUser : {}, {}", id, shopUserDTO);
        if (shopUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, shopUserDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!shopUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ShopUserDTO result = shopUserService.save(shopUserDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, shopUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /shop-users/:id} : Partial updates given fields of an existing shopUser, field will ignore if it is null
     *
     * @param id the id of the shopUserDTO to save.
     * @param shopUserDTO the shopUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shopUserDTO,
     * or with status {@code 400 (Bad Request)} if the shopUserDTO is not valid,
     * or with status {@code 404 (Not Found)} if the shopUserDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the shopUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/shop-users/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ShopUserDTO> partialUpdateShopUser(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ShopUserDTO shopUserDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ShopUser partially : {}, {}", id, shopUserDTO);
        if (shopUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, shopUserDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!shopUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ShopUserDTO> result = shopUserService.partialUpdate(shopUserDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, shopUserDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /shop-users} : get all the shopUsers.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of shopUsers in body.
     */
    @GetMapping("/shop-users")
    public List<ShopUserDTO> getAllShopUsers(@RequestParam(required = false) String filter) {
        if ("shoppingcart-is-null".equals(filter)) {
            log.debug("REST request to get all ShopUsers where shoppingCart is null");
            return shopUserService.findAllWhereShoppingCartIsNull();
        }
        log.debug("REST request to get all ShopUsers");
        return shopUserService.findAll();
    }

    /**
     * {@code GET  /shop-users/:id} : get the "id" shopUser.
     *
     * @param id the id of the shopUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the shopUserDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/shop-users/{id}")
    public ResponseEntity<ShopUserDTO> getShopUser(@PathVariable Long id) {
        log.debug("REST request to get ShopUser : {}", id);
        Optional<ShopUserDTO> shopUserDTO = shopUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(shopUserDTO);
    }

    /**
     * {@code DELETE  /shop-users/:id} : delete the "id" shopUser.
     *
     * @param id the id of the shopUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/shop-users/{id}")
    public ResponseEntity<Void> deleteShopUser(@PathVariable Long id) {
        log.debug("REST request to delete ShopUser : {}", id);
        shopUserService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
