import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import moment from 'moment';

export const transform = (data) => {
  return data.map((o) => {
    const date = moment(o[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED_UP]).format('DD MMM, YYYY');
    return {
      id: o[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
      productInfo: {
        name: o[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE],
        image: '',
      },
      categories: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME],
      author: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME],
      featured: o[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED],
      type: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
        PIM_PRODUCT_DETAIL_FIELD_KEY.PIM_PRODUCT_TYPE
      ],
      lastModified: {
        status: o[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED],
        dateTime: date ?? '',
        author: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME],
      },
    };
  });
};
