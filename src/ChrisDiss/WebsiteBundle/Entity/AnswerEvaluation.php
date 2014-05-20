<?php

namespace ChrisDiss\WebsiteBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Evaluation of a single Question.
 *
 * @ORM\Entity
 */
class AnswerEvaluation
{
    /**
     * Artificial (Doctrine) id of the Answer Evaluation.
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int|null
     */
    protected $id;

    /**
     * User that has given the Answer that is evaluated.
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="answerEvaluations")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
     * @var User
     **/
    private $user;

    /**
     * Result of thee valuation, e.g. 'markedWrongAnswer'.
     *
     * @ORM\Column(type="string", nullable=false)
     * @var string
     */
    private $result;

    /**
     * Creation timestamp of this evaluation.
     *
     * @ORM\Column(type="datetime", nullable=false)
     * @var |DateTime
     */
    private $createdAt;

    /**
     * Constructor.
     *
     * @param User $user
     * @param string $result
     * @param \DateTime $createdAt
     */
    function __construct(User $user, $result, \DateTime $createdAt)
    {
        $this->user = $user;
        $this->result = $result;
        $this->createdAt = $createdAt;
    }
}
