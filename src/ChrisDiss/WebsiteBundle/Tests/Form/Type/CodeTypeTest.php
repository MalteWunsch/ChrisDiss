<?php

namespace ChrisDiss\WebsiteBundle\Tests\Type\CodeType;

use ChrisDiss\WebsiteBundle\Form\Type\CodeType;

/**
 * Tests for the Code Form Type.
 */
class CodeTypeTest extends \PHPUnit_Framework_TestCase
{
    /**
     * System under test.
     *
     * @var \ChrisDiss\WebsiteBundle\Form\Type\CodeType
     */
    private $type;

    /**
     * {@inheritDoc}
     * @see \PHPUnit_Framework_TestCase::setUp()
     */
    protected function setUp()
    {
        parent::setUp();
        $this->type = new CodeType();
    }

    /**
     * {@inheritDoc}
     * @see \PHPUnit_Framework_TestCase::tearDown()
     */
    protected function tearDown()
    {
        $this->type = null;
        parent::tearDown();
    }

    /**
     * Ensures buildForm() adds some elements to the form builder.
     *
     * @TODO: With a better idea of testing forms, one could e.g. test for at least one submit button.
     */
    public function testBuildFormAddsElements()
    {
        $formBuilder = $this->createMockedFormBuilder();
        $formBuilder->expects($this->atLeastOnce())
                    ->method('add')
                    ->will($this->returnSelf());

        $this->type->buildForm($formBuilder, array());
    }

    /**
     * Ensures getName() returns a non empty string.
     */
    public function testGetNameReturnsNonEmptyString()
    {
        $name = $this->type->getName();
        $this->assertInternalType('string', $name);
        $this->assertNotEmpty($name);
    }

    /**
     * Ensures setDefaults() adds the data class.
     */
    public function testSetDefaultOptionsSetsDataClass()
    {
        $optionsResolver = $this->createMockedOptionsResolver();
        $optionsResolver->expects($this->atLeastOnce())
                        ->method('setDefaults')
                        ->with($this->arrayHasKey('data_class'));

        $this->type->setDefaultOptions($optionsResolver);
    }

    /**
     * Create a mocked FormBuilder.
     *
     * @return \PHPUnit_Framework_MockObject_MockObject|\Symfony\Component\Form\FormBuilder
     */
    protected function createMockedFormBuilder()
    {
        return $this->getMockBuilder('Symfony\Component\Form\FormBuilder')
                    ->disableOriginalConstructor()
                    ->getMock();
    }

    /**
     * Create a mocked OptionsResolverInterface.
     *
     * @return \PHPUnit_Framework_MockObject_MockObject|\Symfony\Component\OptionsResolver\OptionsResolverInterface
     */
    protected function createMockedOptionsResolver()
    {
        return $this->getMock('Symfony\Component\OptionsResolver\OptionsResolverInterface');
    }
}
