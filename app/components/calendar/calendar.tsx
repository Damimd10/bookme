import { useMemo, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { MdOutlineTimelapse } from "react-icons/md";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { eachDayOfInterval, format, isToday, parse } from "date-fns";
import { es } from 'date-fns/locale';

interface DayProps {
  date: Date;
  events: any[];
}

function Day({ date, events }: DayProps) {
  const day = format(date, "EEE", { locale: es });
  const month = format(date, "MMM", { locale: es });

  return (
    <div className="flex w-full p-4">
      <div className="flex flex-col items-end mr-4 w-24">
        <span className="capitalize text-xs">{month}</span>
        <h1 className="capitalize text-4xl">{day}</h1>
        {isToday(date) && <span className="text-xs">Today</span>}
      </div>
      <div className="flex flex-col gap-y-2">
        {events.map((event) => (
          <div className="flex items-center gap-x-4 w-full" key={event}>
            <div className="border-l-4 p-2 rounded-lg border-indigo-700 bg-indigo-100 text-sm font-semibold">
              Digital Coaching 1:1
            </div>
            <span className="text-sm font-medium">with Arthur R.</span>
            <div className="flex items-center gap-x-1 text-sm">
              <RiComputerLine />
              On Zoom
            </div>
            <div className="flex items-center gap-x-1 text-sm">
              <IoTimeOutline />
              10.30 - 11.00
            </div>
            <div className="bg-amber-100 flex items-center gap-x-1.5 p-1.5 rounded-lg text-sm text-gray-950 font-medium">
              <MdOutlineTimelapse />
              30 min
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Calendar() {
  const [value, setValue] = useState<DateValueType | null>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: DateValueType) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const intervalInDays = useMemo(() => {
    if (!value?.startDate || !value?.endDate) return [];

    const startDate = parse(value?.startDate as string, "yyyy-MM-dd", new Date());
    const endDate = parse(value?.endDate as string, "yyyy-MM-dd", new Date());

    return eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
  }, [value?.endDate, value?.startDate]);

  return (
    <>
      <Datepicker onChange={handleValueChange} value={value} />
      <div className="mt-8 flex flex-col divide-y">
        {intervalInDays.map((day) => (
          <Day key={day.toDateString()} date={day} events={[1, 2]} />
        ))}
      </div>
    </>
  );
}
