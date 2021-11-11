package com.kabelo.eshop.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.kabelo.eshop.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ShopUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShopUser.class);
        ShopUser shopUser1 = new ShopUser();
        shopUser1.setId(1L);
        ShopUser shopUser2 = new ShopUser();
        shopUser2.setId(shopUser1.getId());
        assertThat(shopUser1).isEqualTo(shopUser2);
        shopUser2.setId(2L);
        assertThat(shopUser1).isNotEqualTo(shopUser2);
        shopUser1.setId(null);
        assertThat(shopUser1).isNotEqualTo(shopUser2);
    }
}
