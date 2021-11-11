package com.kabelo.eshop.service;

import com.kabelo.eshop.service.dto.ShopUserDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.kabelo.eshop.domain.ShopUser}.
 */
public interface ShopUserService {
    /**
     * Save a shopUser.
     *
     * @param shopUserDTO the entity to save.
     * @return the persisted entity.
     */
    ShopUserDTO save(ShopUserDTO shopUserDTO);

    /**
     * Partially updates a shopUser.
     *
     * @param shopUserDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ShopUserDTO> partialUpdate(ShopUserDTO shopUserDTO);

    /**
     * Get all the shopUsers.
     *
     * @return the list of entities.
     */
    List<ShopUserDTO> findAll();
    /**
     * Get all the ShopUserDTO where ShoppingCart is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<ShopUserDTO> findAllWhereShoppingCartIsNull();

    /**
     * Get the "id" shopUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ShopUserDTO> findOne(Long id);

    /**
     * Delete the "id" shopUser.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
