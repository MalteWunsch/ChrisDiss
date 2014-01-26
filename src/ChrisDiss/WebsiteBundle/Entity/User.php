<?php

namespace ChrisDiss\WebsiteBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * A "logged in" user, authenticated by their personal code (which maybe is not unique).
 *
 * @ORM\Entity
 */
class User
{
    /**
     * Artificial (Doctrine) id of the user.
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int|null
     */
    protected $id;

    /**
     * Personal identification code of the user, which doesn't have to be unique by itself, but should be in combination
     * with other data like input time.
     *
     * @Assert\NotBlank()
     * @Assert\Length(min = 5, max = 5)
     *
     * @ORM\Column(type="string", length=5)
     *
     * @var string|null
     */
    protected $code;

    /**
     * Number of answers that were wrong but correctly marked as such.
     *
     * @ORM\Column(type="integer")
     *
     * @var int|null
     */
    protected $markedWrongAnswers;

    /**
     * Number of answers that were wrong and not marked as such.
     *
     * @ORM\Column(type="integer")
     *
     * @var int|null
     */
    protected $unmarkedWrongAnswers;

    /**
     * Number answers that were correct but marked as wrong.
     *
     * @ORM\Column(type="integer")
     *
     * @var int|null
     */
    protected $markedCorrectAnswers;

    /**
     * Number of answers that were correct and correctly not marked as wrong.
     *
     * @ORM\Column(type="integer")
     *
     * @var int|null
     */
    protected $unmarkedCorrectAnswers;

    /**
     * Number of "empty" answers, where the user was not fast enough to type in their answer.
     *
     * @ORM\Column(type="integer")
     *
     * @var int|null
     */
    protected $noAnswers;

    /**
     * Date at which this entity was persisted in the database for the first time.
     *
     * @ORM\Column(type="datetime")
     *
     * @var \DateTime
     */
    protected $createdAt;

    /**
     * Gets the artificial (Doctrine) id of the user.
     *
     * @return string|null
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Sets the personal identification code of the user, which may doesn't have to be unique by itself.
     *
     * @param string $code
     * @return $this fluent interface
     */
    public function setCode($code)
    {
        $this->code = $code;
        return $this;
    }

    /**
     * Gets the personal identification code of the user, which doesn't have to be unique by itself.
     *
     * @return string|null
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Set the number of answers that were wrong but correctly marked as such.
     *
     * @param string $number
     * @return $this fluent interface
     */
    public function setMarkedWrongAnswers($number)
    {
        $this->markedWrongAnswers = $number;
        return $this;
    }

    /**
     * Get the number of answers that were wrong but correctly marked as such.
     *
     * @return string|null
     */
    public function getMarkedWrongAnswers()
    {
        return $this->markedWrongAnswers;
    }

    /**
     * Set the number of answers that were wrong and not marked as such.
     *
     * @param string $number
     * @return $this fluent interface
     */
    public function setUnmarkedWrongAnswers($number)
    {
        $this->unmarkedWrongAnswers = $number;
        return $this;
    }

    /**
     * Get the number of answers that were wrong and not marked as such.
     *
     * @return string|null
     */
    public function getUnmarkedWrongAnswers()
    {
        return $this->unmarkedWrongAnswers;
    }

    /**
     * Set the number of answers that were correct but marked as wrong.
     *
     * @param string $number
     * @return $this fluent interface
     */
    public function setMarkedCorrectAnswers($number)
    {
        $this->markedCorrectAnswers = $number;
        return $this;
    }

    /**
     * Get the number of answers that were correct but marked as wrong.
     *
     * @return string|null
     */
    public function getMarkedCorrectAnswers()
    {
        return $this->markedCorrectAnswers;
    }

    /**
     * Set the number of answers that were correct and correctly not marked as wrong.
     *
     * @param string $number
     * @return $this fluent interface
     */
    public function setUnmarkedCorrectAnswers($number)
    {
        $this->unmarkedCorrectAnswers = $number;
        return $this;
    }

    /**
     * Get the number of answers that were correct and correctly not marked as wrong.
     *
     * @return string|null
     */
    public function getUnmarkedCorrectAnswers()
    {
        return $this->unmarkedCorrectAnswers;
    }

    /**
     * Set the number of "empty" answers, where the user was not fast enough to type in their answer.
     *
     * @param string $number
     * @return $this fluent interface
     */
    public function setNoAnswers($number)
    {
        $this->noAnswers = $number;
        return $this;
    }

    /**
     * Get the number of "empty" answers, where the user was not fast enough to type in their answer.
     *
     * @return string|null
     */
    public function getNoAnswers()
    {
        return $this->noAnswers;
    }

    /**
     * Set the date at which this entity was persisted in the database for the first time.
     *
     * @param \DateTime $date
     * @return $this fluent interface
     */
    public function setCreatedAt(\DateTime $date)
    {
        $this->createdAt = $date;
        return $this;
    }

    /**
     * Get the date at which this entity was persisted in the database for the first time.
     *
     * @return \DateTime|null
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }
}
