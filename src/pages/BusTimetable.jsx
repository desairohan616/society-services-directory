import { Link } from "react-router-dom";

// Bus timetable data for Route No. 48
const busTimetable = {
  routeNumber: "48",
  effectiveDate: "1-4-2025",
  directions: [
    {
      from: "Chendani Koliwada CIDCO",
      to: "Godavari Soci. (Rustomjee Azziano)",
      totalTrips: 64,
      times: [
        "6:00", "6:20", "6:40", "7:00", "7:20", "7:40", "8:00", "8:10", "8:20", "8:30",
        "8:40", "8:50", "9:00", "9:10", "9:30", "9:50", "10:00", "10:00", "10:20",
        "10:30", "10:40", "10:50", "11:20", "11:30", "11:40", "11:50", "12:15",
        "12:35", "12:35", "13:00", "13:20", "13:40", "14:00",
        "16:00", "16:20", "16:40", "16:50", "17:00", "17:10", "17:20", "17:30",
        "17:40", "17:55", "18:05", "18:15", "18:25", "18:35", "18:50", "19:00",
        "19:10", "19:20", "19:35", "19:45", "19:55", "20:05", "20:30", "20:45",
        "20:55", "21:10", "21:35", "21:45", "21:55", "22:05", "22:30", "22:50"
      ]
    },
    {
      from: "Godavari Soci. (Rustomjee Azziano C)",
      to: "Chendani Koliwada CIDCO",
      totalTrips: 68,
      times: [
        "5:40", "6:00", "6:20", "6:40", "7:00", "7:20", "7:40", "8:00", "8:10", "8:20",
        "8:30", "8:40", "8:50", "9:10", "9:30", "9:40", "9:50", "10:00", "10:10",
        "10:20", "10:30", "11:00", "11:10", "11:20", "11:30", "11:45", "11:55",
        "12:05", "12:15", "12:40", "13:00", "13:20", "13:40", "14:00", "14:20",
        "16:20", "16:40", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
        "18:00", "18:15", "18:25", "18:35", "18:45", "18:55", "19:10", "19:20",
        "19:30", "19:40", "20:05", "20:25", "20:30", "20:50", "21:15", "21:20",
        "21:30", "21:40", "21:55", "22:05", "22:15", "22:25", "22:50", "23:10"
      ]
    }
  ]
};

export default function BusTimetable() {
  // Convert 24-hour format to 12-hour format with AM/PM
  const convertTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return {
      time: `${hour12}:${minutes} ${period}`,
      hour24: hour,
      minutes: parseInt(minutes),
      period
    };
  };

  // Group times by period (AM/PM) and hour for better display
  const groupTimesByPeriod = (times) => {
    const grouped = {
      morning: [], // 5 AM - 11:59 AM
      afternoon: [], // 12 PM - 4:59 PM
      evening: [], // 5 PM - 8:59 PM
      night: [] // 9 PM - 11:59 PM
    };

    times.forEach((time) => {
      const converted = convertTo12Hour(time);
      const timeObj = { original: time, ...converted };
      
      if (converted.hour24 >= 5 && converted.hour24 < 12) {
        grouped.morning.push(timeObj);
      } else if (converted.hour24 >= 12 && converted.hour24 < 17) {
        grouped.afternoon.push(timeObj);
      } else if (converted.hour24 >= 17 && converted.hour24 < 21) {
        grouped.evening.push(timeObj);
      } else {
        grouped.night.push(timeObj);
      }
    });

    // Sort each group by time
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        if (a.hour24 !== b.hour24) return a.hour24 - b.hour24;
        return a.minutes - b.minutes;
      });
    });

    return grouped;
  };

  const getPeriodLabel = (period) => {
    const labels = {
      morning: "🌅 Morning (5 AM - 11:59 AM)",
      afternoon: "☀️ Afternoon (12 PM - 4:59 PM)",
      evening: "🌆 Evening (5 PM - 8:59 PM)",
      night: "🌙 Night (9 PM - 11:59 PM)"
    };
    return labels[period] || period;
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pb-8">
      <div className="mb-4 sm:mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-700 active:text-blue-800 flex items-center space-x-2 mb-3 text-sm sm:text-base min-h-[44px] inline-flex"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Home</span>
        </Link>
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Bus Timetable
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-gray-600 text-sm sm:text-base">
              Route No. <span className="font-semibold text-blue-600">{busTimetable.routeNumber}</span>
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Effective from: <span className="font-medium">{busTimetable.effectiveDate}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {busTimetable.directions.map((direction, index) => {
          const groupedTimes = groupTimesByPeriod(direction.times);
          
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  <h2 className="text-lg sm:text-xl font-bold">
                    {direction.from} → {direction.to}
                  </h2>
                </div>
                <p className="text-blue-100 text-sm sm:text-base">
                  Total {direction.totalTrips} trips
                </p>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {Object.keys(groupedTimes).map((period) => {
                  if (groupedTimes[period].length === 0) return null;
                  
                  return (
                    <div key={period} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800">
                          {getPeriodLabel(period)}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          {groupedTimes[period].length} {groupedTimes[period].length === 1 ? "trip" : "trips"}
                        </p>
                      </div>
                      <div className="p-4 sm:p-5">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                          {groupedTimes[period].map((timeObj, timeIndex) => (
                            <div
                              key={timeIndex}
                              className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg px-3 py-2.5 text-center transition-colors"
                            >
                              <span className="text-sm sm:text-base font-semibold text-blue-700 block">
                                {timeObj.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Quick Reference - All Times */}
                <div className="mt-6 pt-6 border-t-2 border-gray-300">
                  <details className="group">
                    <summary className="cursor-pointer text-base sm:text-lg font-bold text-gray-800 flex items-center justify-between py-2">
                      <span className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>View All Times (Quick Reference)</span>
                      </span>
                      <svg
                        className="w-5 h-5 transform group-open:rotate-180 transition-transform text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {direction.times.map((time, timeIndex) => {
                          const converted = convertTo12Hour(time);
                          return (
                            <div
                              key={timeIndex}
                              className="text-center bg-white px-2 py-2 rounded text-xs sm:text-sm font-medium text-gray-700 border border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                            >
                              {converted.time}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

