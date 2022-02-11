package com.kabelo.eshop.service.impl;

import com.kabelo.eshop.domain.ShopUser;
import com.kabelo.eshop.repository.ShopUserRepository;
import com.kabelo.eshop.service.ShopUserService;
import com.kabelo.eshop.service.dto.ShopUserDTO;
import com.kabelo.eshop.service.mapper.ShopUserMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ShopUser}.
 */
@Service
@Transactional
public class ShopUserServiceImpl implements ShopUserService {

    private final Logger log = LoggerFactory.getLogger(ShopUserServiceImpl.class);

    private final ShopUserRepository shopUserRepository;

    private final ShopUserMapper shopUserMapper;

    public ShopUserServiceImpl(ShopUserRepository shopUserRepository, ShopUserMapper shopUserMapper) {
        this.shopUserRepository = shopUserRepository;
        this.shopUserMapper = shopUserMapper;
    }

    @Override
    public ShopUserDTO save(ShopUserDTO shopUserDTO) {
        log.debug("Request to save ShopUser : {}", shopUserDTO);
        ShopUser shopUser = shopUserMapper.toEntity(shopUserDTO);
        shopUser = shopUserRepository.save(shopUser);
        return shopUserMapper.toDto(shopUser);
    }

    @Override
    public Optional<ShopUserDTO> partialUpdate(ShopUserDTO shopUserDTO) {
        log.debug("Request to partially update ShopUser : {}", shopUserDTO);

        return shopUserRepository
            .findById(shopUserDTO.getId())
            .map(existingShopUser -> {
                shopUserMapper.partialUpdate(existingShopUser, shopUserDTO);

                return existingShopUser;
            })
            .map(shopUserRepository::save)
            .map(shopUserMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShopUserDTO> findAll() {
        log.debug("Request to get all ShopUsers");
        return shopUserRepository.findAll().stream().map(shopUserMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get all the shopUsers where ShoppingCart is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ShopUserDTO> findAllWhereShoppingCartIsNull() {
        log.debug("Request to get all shopUsers where ShoppingCart is null");
        return StreamSupport
            .stream(shopUserRepository.findAll().spliterator(), false)
            .filter(shopUser -> shopUser.getShoppingCart() == null)
            .map(shopUserMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ShopUserDTO> findOne(Long id) {
        log.debug("Request to get ShopUser : {}", id);
        return shopUserRepository.findById(id).map(shopUserMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ShopUser : {}", id);
        shopUserRepository.deleteById(id);
    }
}
