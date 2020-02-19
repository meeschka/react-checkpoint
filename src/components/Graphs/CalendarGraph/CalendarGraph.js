import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css'

import './CalendarGraph.css'

const CalendarGraph = (props) => {
    const startDate = props.checkpoint.startDate.slice(0, 10)
    const endDate = props.checkpoint.endDate.slice(0, 10)
    //find number of days displayed by calendar to determine it's width
    const timePeriod=((new Date(props.checkpoint.endDate)).getTime() - (new Date(props.checkpoint.startDate)).getTime())/(1000*60*60*24)
    const widthClasses=['data-container-one-month', 'data-container-two-months', 'data-container-three-months', 'data-container-four-months']
    const containerClass = widthClasses[Math.floor(timePeriod/32)] || 'data-container-five-months'
    const avgStars = props.avgScore || 0
    return (
        <div class='data-container'>
            <div className={containerClass}>
                <CalendarHeatmap
                    startDate = { startDate }
                    endDate = { endDate }
                    values = { props.data }
                    classForValue={(value) => {
                        if (!value) {
                        return 'color-empty';
                        }
                        return `color-scale-${value.count}`;
                    }}
                    tooltipDataAttrs={value => {
                        return {
                          'data-tip': `${value.date} has rating of ${value.count}. ${value.data ? 'Note: '+value.data : ''}`,
                        };
                      }}
                />
                <ReactTooltip />
            </div>
            <div id='star-background-wrapper'>
                <div className='star-background-inner'>
                    <h3 className='star-background-text'>{props.avgScore === 0 ? 'You have not logged any daily progress yet' : `${props.avgScore} / 5`}</h3>
                </div>  
            </div>
        </div>
        
    )
}

export default CalendarGraph