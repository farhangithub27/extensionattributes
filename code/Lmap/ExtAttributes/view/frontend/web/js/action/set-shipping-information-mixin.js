/*jshint browser:true jquery:true*/
/*global alert*/
define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote'
], function ($, wrapper, quote)
{
    'use strict';

    return function (setShippingInformationAction)
    {

        return wrapper.wrap(setShippingInformationAction, function (originalAction)
        {
            var shippingAddress = quote.shippingAddress();
            if (shippingAddress['extension_attributes'] === undefined)
            {
                shippingAddress['extension_attributes'] = {};
            }

            //console.log(shippingAddress.customAttributes['suburb']);
            // you can extract value of extension attribute from any place (in this example I use customAttributes approach)
            shippingAddress['extension_attributes']['suburb'] = shippingAddress.customAttributes['suburb']['value'];
            // 'value' key needs to be appended because following error was popping up "Error occurred during 'shipping_address'
            // processing. Error occurred during 'extension_attributes' processing. Error occurred during 'suburb' processing.
            // The 'array' values's type is invalid. The 'string' type was expected. Verify and try again." Refer to doc
            // JS custom to extension attribute conversion error frontend debigging.docx in Lmap/ExtAttributes folder


            //shippingAddress['extension_attributes']['delivery_date'] = jQuery('[name="delivery_date"]').val();
            // pass execution to original action ('Magento_Checkout/js/action/set-shipping-information')
            return originalAction();
        });
    };
});
