<?php

namespace ChrisDiss\WebsiteBundle\Tests\DependencyInjection;

use ChrisDiss\WebsiteBundle\DependencyInjection\ChrisDissWebsiteExtension;

/**
 * Tests for the ChrisDissWebsiteExtension.
 */
class ChrisDissWebsiteExtensionTest extends \PHPUnit_Framework_TestCase
{
    /**
     * Ensures load adds some kind of resource.
     */
    public function testLoadAddsResource()
    {
        $container = $this->createMockedContainerBuilder();
        $container->expects($this->atLeastOnce())
                  ->method('addResource');

        $extension = new ChrisDissWebsiteExtension();
        $extension->load(array(), $container);
    }

    /**
     * Create a mocked ContainerBuilder.
     *
     * @return \PHPUnit_Framework_MockObject_MockObject|\Symfony\Component\DependencyInjection\ContainerBuilder
     */
    protected function createMockedContainerBuilder()
    {
        return $this->getMockBuilder('Symfony\Component\DependencyInjection\ContainerBuilder')
                    ->disableOriginalConstructor()
                    ->getMock();
    }
}
