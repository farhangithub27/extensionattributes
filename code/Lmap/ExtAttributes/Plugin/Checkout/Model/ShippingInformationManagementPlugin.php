<?php
namespace Lmap\ExtAttributes\Plugin\Checkout\Model;

use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Checkout\Api\Data\ShippingInformationInterface;
use Magento\Quote\Api\Data\AddressInterface;
class ShippingInformationManagementPlugin
{
    /**
     * @var QuoteRepository
     */
    protected $quoteRepository;


    /**
     * @var QuoteAddress
     */
    protected $quoteAddress;
    /**
     * ShippingInformationManagement constructor.
     *
     * @param QuoteRepository $quoteRepository
     */
    public function __construct(
        CartRepositoryInterface $quoteRepository,
        AddressInterface $quoteAddress
    ) {
        $this->quoteRepository = $quoteRepository;
        $this->quoteAddress = $quoteAddress;
    }
    /**
     * @param \Magento\Checkout\Model\ShippingInformationManagement $subject
     * @param $cartId
     * @param ShippingInformationInterface $addressInformation
     */
    public function beforeSaveAddressInformation(
        \Magento\Checkout\Model\ShippingInformationManagement $subject,
        $cartId,
        \Magento\Checkout\Api\Data\ShippingInformationInterface $addressInformation
    ) {
        $shippingAddress = $addressInformation->getShippingAddress();
        $extAttributes = $shippingAddress->getExtensionAttributes();
        if ($extAttributes) {
            $suburbField = $extAttributes->getSuburb();
            $shippingAddress->setSuburb($suburbField);
        }
        $quote = $this->quoteRepository->getActive($cartId);
        //$this->quoteAddress->setExtensionAttributes($suburbField);
    }
}