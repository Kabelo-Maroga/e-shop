package com.kabelo.eshop.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ShopUserMapperTest {

    private ShopUserMapper shopUserMapper;

    @BeforeEach
    public void setUp() {
        shopUserMapper = new ShopUserMapperImpl();
    }
}
