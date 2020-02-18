import React from 'react'
import { ResponsiveCalendar } from 'nivo'
import './CalendarGraph.css'
const CalendarGraph = (props) => {
    let startDate = props.checkpoint.startDate.slice(0, 10)
    let endDate = props.checkpoint.endDate.slice(0, 10)
    return (
        <div className='data-container'>
            <ResponsiveCalendar
                data={props.data}
                from={startDate}
                to={endDate}
                emptyColor="#eeeeee"
                colors={[ '#705f27', '#e5fa5a', '#D6E9D5', '#258a43', '#005731' ]}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                tooltip={function(e){}}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left'
                    }
                ]}
            />
        </div>
    )
}

export default CalendarGraph