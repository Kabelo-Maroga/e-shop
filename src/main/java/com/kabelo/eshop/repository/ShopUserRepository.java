package com.kabelo.eshop.repository;

import com.kabelo.eshop.domain.ShopUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ShopUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopUserRepository extends JpaRepository<ShopUser, Long> {}
