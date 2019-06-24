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

            // shippingAddress['extension_attributes']['suburb'] = shippingAddress.customAttributes['suburb'];

            if ($.isArray(shippingAddress.customAttributes))
            {
                shippingAddress['extension_attributes']['suburb'] = shippingAddress.customAttributes[0]['value'];
                // If new Address is added @ shipping stage of checkout process then following structure was observed in payload
                // customAttributes: [{attribute_code: "suburb", value: "gungahlin"}]
            }

            else
            {
                shippingAddress['extension_attributes']['suburb'] = shippingAddress.customAttributes['suburb']['value'];
                // If shipping address coming from database from customer_address_entity
                // 'value' key needs to be appended because following error was popping up "Error occurred during 'shipping_address'
                // processing. Error occurred during 'extension_attributes' processing. Error occurred during 'suburb' processing.
                // The 'array' values's type is invalid. The 'string' type was expected. Verify and try again." Refer to doc
                // JS custom to extension attribute conversion error frontend debigging.docx in Lmap/ExtAttributes folder
                // payload structure is
                // customAttributes: {suburb: {attribute_code: "suburb", value: "Deakin"}}
            }






            //shippingAddress['extension_attributes']['suburb'] = jQuery('[name="suburb"]').val();
            // pass execution to original action ('Magento_Checkout/js/action/set-shipping-information')
            return originalAction();
        });
    };
});
