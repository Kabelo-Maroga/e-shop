package com.kabelo.eshop.service.mapper;

import com.kabelo.eshop.domain.ShoppingCart;
import com.kabelo.eshop.service.dto.ShoppingCartDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ShoppingCart} and its DTO {@link ShoppingCartDTO}.
 */
@Mapper(componentModel = "spring", uses = { ShopUserMapper.class, ProductMapper.class })
public interface ShoppingCartMapper extends EntityMapper<ShoppingCartDTO, ShoppingCart> {
    @Mapping(target = "shopUser", source = "shopUser")
    @Mapping(target = "product", source = "product")
    ShoppingCartDTO toDto(ShoppingCart s);
}
