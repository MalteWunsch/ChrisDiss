<?php

namespace ChrisDiss\WebsiteBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Type class for the "code" form.
 */
class CodeType extends AbstractType
{
    /**
     * @see \Symfony\Component\Form\FormTypeInterface::buildForm()
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('code', null, array('label' => 'Code'))
                ->add('save', 'submit', array('label' => 'absenden'));
    }

    /**
     * @see \Symfony\Component\Form\FormTypeInterface::getName()
     */
    public function getName()
    {
        return 'code';
    }

    /**
     * @see \Symfony\Component\Form\FormTypeInterface::setDefaultOptions()
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(
            array(
                'data_class' => 'ChrisDiss\WebsiteBundle\Entity\User',
            )
        );
    }
}
