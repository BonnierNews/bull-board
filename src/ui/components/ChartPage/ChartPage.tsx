import React from 'react'
import { AppQueue } from '../../../@types/app'
// import { Store } from '../../hooks/useStore'
// import { JobCard } from '../JobCard/JobCard'
// import { QueueActions } from '../QueueActions/QueueActions'
// import { StatusMenu } from '../StatusMenu/StatusMenu'
import s from './ChartPage.module.css'

export const ChartPage = ({
  // selectedStatus,
  // actions,
  chart,
}: {
  chart: AppQueue | undefined
  // actions: Store['actions']
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
