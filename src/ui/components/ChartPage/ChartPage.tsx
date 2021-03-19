import React from 'react'
import { AppChart } from '../../../@types/app'
import { Store } from '../../hooks/useStore'
import { Line } from "react-chartjs-2"

// import { JobCard } from '../JobCard/JobCard'
// import { QueueActions } from '../QueueActions/QueueActions'
// import { StatusMenu } from '../StatusMenu/StatusMenu'
import s from './ChartPage.module.css'

const data = {
  datasets: [
    {
      label: 'Completed jobs',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [{
        x: 10,
        y: 20
      }, {
        x: 15,
        y: 10
      }]
    }
  ]
};
export const ChartPage = ({
  // selectedStatus,
  // actions,
  chart,
}: {
  chart: AppChart | undefined
  actions: Store['actions']
  // selectedStatus: Store['selectedStatuses']
}) => {
  if (!chart) {
    return <section>Chart Not found</section>
  }

  return (
    <section>
      <div className={s.stickyHeader}>
        {/* <StatusMenu
          chart={chart}
          selectedStatus={selectedStatus}
          onChange={actions.setSelectedStatuses}
        />
        {!chart.readOnlyMode && (
          <QueueActions
            chart={chart}
            actions={actions}
            status={selectedStatus[chart.name]}
          />
        )} */}
      </div>
      <Line data={data} />
      {/* {chart.jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          status={selectedStatus[chart.name]}
          actions={{
            cleanJob: actions.cleanJob(chart?.name)(job),
            promoteJob: actions.promoteJob(chart?.name)(job),
            retryJob: actions.retryJob(chart?.name)(job),
          }}
          readOnlyMode={chart?.readOnlyMode}
        />
      ))} */}
    </section>
  )
}
