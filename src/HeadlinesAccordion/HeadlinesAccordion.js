import React, { Component } from 'react';
import { Accordion, Button, Card, Spinner } from 'react-bootstrap';
import './HeadlinesAccordion.css'

class HeadlinesAccordion extends Component {
    render() {
        let accordionData;

        if (this.props.dates.length === 0) {
            accordionData = <Spinner animation="border" variant="light" role="status"><span className="sr-only"></span></Spinner>
        } else {
            let i = 0;
            accordionData = this.props.dates.map( date => {
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
                                    <span className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
                                    {'On ' + new Intl.DateTimeFormat("en-GB", {year: "numeric", month: "long", day: "2-digit"}).format(new Date(date.date))}
                                    {", the headlines made me feel " + date.analysis.Sentiment.toLowerCase()}
                                    </span>
                                    <span className="col-xs-1 col-sm-1 col-md-1 col-lg-1">{emoji}</span>
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

        return (
            <div>
                <p>Click the dates below to see each day's analysis and top headlines</p>
                <Accordion className="Accordion">{accordionData}</Accordion> 
            </div>
        )
    }
}

export default HeadlinesAccordion;