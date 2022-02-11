package com.kabelo.eshop.service.mapper;

import com.kabelo.eshop.domain.ShopUser;
import com.kabelo.eshop.service.dto.ShopUserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ShopUser} and its DTO {@link ShopUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ShopUserMapper extends EntityMapper<ShopUserDTO, ShopUser> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ShopUserDTO toDtoId(ShopUser shopUser);
}
