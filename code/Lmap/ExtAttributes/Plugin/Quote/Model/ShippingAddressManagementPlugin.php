<?php
namespace Lmap\ExtAttributes\Plugin\Quote\Model;

class ShippingAddressManagementPlugin
{

    protected $logger;

    public function __construct(
        \Psr\Log\LoggerInterface $logger
    ) {
        $this->logger = $logger;
    }

    /**
     * @param \Magento\Quote\Model\ShippingAddressManagement $subject
     * @param $cartId
     * @param \Magento\Quote\Api\Data\AddressInterface $address
     * This method is triggered when a product is added to cart
     */
    public function beforeAssign(
        \Magento\Quote\Model\ShippingAddressManagement $subject,
        $cartId,
        \Magento\Quote\Api\Data\AddressInterface $address
    ) {

        $extAttributes = $address->getExtensionAttributes();

        if (!empty($extAttributes)) {

            try {
                $address->setExtensionAttributes($extAttributes->setSuburb($extAttributes->getSuburb()));
                //$address->setSuburb($extAttributes->getSuburb());
                //$extAttributes->setSuburb($extAttributes->getSuburb());
            } catch (\Exception $e) {
                $this->logger->critical($e->getMessage());
            }

        }

        //return $address;

    }
}