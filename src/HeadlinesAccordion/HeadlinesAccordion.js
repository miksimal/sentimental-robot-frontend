import React, { Component } from 'react';
import { Accordion, Button, Card, Spinner } from 'react-bootstrap';
import './HeadlinesAccordion.css'

const NUMBER_OF_DAYS = 4;

class HeadlinesAccordion extends Component {

    render() {
        let accordionData;

        if (this.props.dates.length === 0) {
            accordionData = <Spinner animation="border" variant="light" role="status"><span className="sr-only"></span></Spinner>
        } else {
            let i = 0;
            accordionData = this.props.dates.map( date => {
                if (i >= NUMBER_OF_DAYS) return;
                i++;
                let emoji;

                switch(date.analysis.Sentiment) {
                    case 'POSITIVE':
                        emoji = '😊';
                        break;
                    case 'NEGATIVE':
                        emoji = '😡';
                        break;
                    case 'NEUTRAL':
                        emoji = '😐';
                        break;
                    default:
                        emoji = '🤷‍♂️'; 
                }

                return (
                    <Card key={i}>
                        <Card.Header>
                            <Accordion.Toggle className="container" variant="text" as={Button} eventKey={i}>
                                <div className="row">
                                    {'On ' + new Intl.DateTimeFormat("en-GB", {year: "numeric", month: "long", day: "2-digit"}).format(new Date(date.date))}
                                    {", I felt " + date.analysis.Sentiment.toLowerCase() + " " + emoji}
                                </div>
                            </Accordion.Toggle> 
                        </Card.Header>
                        <Accordion.Collapse eventKey={i}>
                            <Card.Body className="CardBody">
                                <h6>Sentiment score:</h6>
                                <span>Neutral: {date.analysis.SentimentScore.Neutral.toFixed(2)}; </span>
                                <span>Negative: {date.analysis.SentimentScore.Negative.toFixed(2)}; </span>
                                <span>Positive: {date.analysis.SentimentScore.Positive.toFixed(2)}; </span>
                                <span>Mixed: {date.analysis.SentimentScore.Mixed.toFixed(2)}.</span>
                                <p></p>
                                <h6>Headlines:</h6>
                                {date.topHeadlines.map((headline, i, arr) => {
                                    if (arr.length - 1 === i) return <span>{headline}.</span>
                                    else return <span>{headline} | </span>
                                })}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                );
            });
        }

        const textSection = this.calculateText();

        return (
            <div className="AccordionSection">
                <div className="AccordionSection--content">
                    <Accordion className="Accordion">{accordionData}</Accordion> 
                </div>
                {textSection}
            </div>
        )
    }

    calculateText() {
        if (this.props.dates.length === 0) return;
        const data = this.props.dates.slice(0,4).map(e => e.analysis.SentimentScore);
        const currentScores = { Neutral: 0, Negative: 0, Positive: 0, Mixed: 0 };
        const summedScores = data.reduce((currentScores, sentimentScore) => {
            currentScores.Neutral += sentimentScore.Neutral;
            currentScores.Negative += sentimentScore.Negative;
            currentScores.Positive += sentimentScore.Positive;
            currentScores.Mixed += sentimentScore.Mixed;
            return currentScores;
        }, currentScores);
        const scoresArray = Object.values(summedScores);
        const index = scoresArray.indexOf(Math.max(...scoresArray));
        let majorSentiment;
        switch (index) {
            case 0:
                majorSentiment = 'pretty neutral overall 😐';
                break;
            case 1:
                majorSentiment = 'a bit down overall 😢';
                break;
            case 2:
                majorSentiment = 'pretty good overall 😊';
                break;
            case 3:
                majorSentiment = 'confused overall 🤷‍♂️';
                break;
            default:
                return <div className="AccordionSection--text"><h4>Sorry, something has gone wrong here; I don't have data for the past few days.</h4></div>;
        }

        return (
            <div className="AccordionSection--text">
                <h4>These past few days I've felt {majorSentiment}</h4>
                <p>Hit the tabs on the left to see my analysis for each day to understand why.</p>
            </div>
        );
    }

}

export default HeadlinesAccordion;