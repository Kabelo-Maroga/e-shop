package com.kabelo.eshop.service.mapper;

import com.kabelo.eshop.domain.ShoppingCart;
import com.kabelo.eshop.service.dto.ShoppingCartDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ShoppingCart} and its DTO {@link ShoppingCartDTO}.
 */
@Mapper(componentModel = "spring", uses = { ShopUserMapper.class, ProductMapper.class })
public interface ShoppingCartMapper extends EntityMapper<ShoppingCartDTO, ShoppingCart> {
    @Mapping(target = "shopUser", source = "shopUser", qualifiedByName = "id")
    @Mapping(target = "product", source = "product", qualifiedByName = "id")
    ShoppingCartDTO toDto(ShoppingCart s);
}
