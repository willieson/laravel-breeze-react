import React from 'react';

const isSchedules = (schedules) => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2">Movie ID</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Stock</th>
                </tr>
            </thead>
            <tbody>
                {schedules.map((schedule) => (
                    <tr key={schedule.schedule_id}>
                        <td className="border px-4 py-2">{schedule.movie_id}</td>
                        <td className="border px-4 py-2">{schedule.date}</td>
                        <td className="border px-4 py-2">{schedule.time}</td>
                        <td className="border px-4 py-2">{schedule.stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const noSchedules = () => {
    return (
        <div>Tidak Ada Schedule</div>
    );
};

const ScheduleList = ({ schedules }) => {
    return !schedules || schedules.length === 0 ? noSchedules() : isSchedules(schedules);
};

export default ScheduleList;
