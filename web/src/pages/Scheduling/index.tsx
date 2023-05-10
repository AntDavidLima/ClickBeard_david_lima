import {
  DateCalendar,
  DateTimeField,
  TimeClock,
  TimeView,
} from '@mui/x-date-pickers';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { api } from '../../www/api';
import { PickerSelectionState } from '@mui/x-date-pickers/internals';

interface Appointment {
  id: string;
  appointment_time: Date;
  client_id: string;
  specialty_id: string;
  barber_id: string;
}

interface Specialty {
  id: string;
  name: string;
}

interface Barber {
  id: string;
  name: string;
  age: number;
  hiring_date: Date;
}

export function Scheduling() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [date, setDate] = useState<Moment | null>(moment());
  const [time, setTime] = useState<Moment | null>(moment());
  const [busySchedulesToday, setBusySchedulesToday] = useState<Appointment[]>(
    []
  );
  const [specialty, setSpecialty] = useState<string | undefined>();
  const [barber, setBarber] = useState<string | undefined>();
  const [isTimeChoose, setIsTimeChoose] = useState(false);

  const appointmentTime = moment({
    year: date?.year(),
    month: date?.month(),
    day: date?.date(),
    hour: time?.hour(),
    minute: time?.minute(),
  });

  const submitDisabled = !specialty || !barber || !isTimeChoose;

  useEffect(() => {
    loadBusySchedules();
  }, [date]);

  useEffect(() => {
    loadSpecialties();
    loadBarbers();
  }, []);

  return (
    <main className="bg-gray-900 w-full text-white flex-1">
      <div className="max-w-screen-xl mx-auto px-4 py-8 h-full flex flex-col justify-between">
        <div className="flex gap-16 max-h-[30vh]">
          <ScrollArea.Root className="overflow-hidden flex-1">
            <h2 className="text-center text-xl mb-6 font-bold">
              Especialidade
            </h2>
            <ScrollArea.Viewport className="w-full h-full flex after:content-[''] after:absolute after:bg-gradient-to-b after:from-transparent after:to-gray-900 after:bottom-0 after:z-10 after:h-6 after:w-full">
              <ToggleGroup.Root
                type="single"
                aria-label="Especialidade"
                className="mb-6 pb-12 flex gap-4 flex-wrap justify-center"
                onValueChange={handleChangeSpecialty}
                value={specialty}
              >
                {specialties.map((item) => (
                  <ToggleGroup.Item
                    className="bg-slate-600 p-2 rounded-3xl data-[state=on]:bg-amber-500 data-[state=on]:font-semibold"
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="z-20 bg-gray-400 hover:bg-gray-600 rounded-lg w-2">
              <ScrollArea.Thumb className="bg-amber-500 rounded-lg" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
          <ScrollArea.Root className="flex-1 overflow-hidden">
            <h2 className="text-center text-xl mb-6 font-bold">Profissional</h2>
            <ScrollArea.Viewport className="w-full h-full flex after:content-[''] after:absolute after:bg-gradient-to-b after:from-transparent after:to-gray-900 after:bottom-0 after:z-10 after:h-6 after:w-full">
              <ToggleGroup.Root
                type="single"
                onValueChange={handleChangeProfessional}
                value={barber}
                aria-label="Especialidade"
                className="mb-6 pb-12 flex gap-4 flex-wrap justify-center"
              >
                {barbers.map((item) => (
                  <ToggleGroup.Item
                    className="bg-slate-600 p-2 rounded-3xl data-[state=on]:bg-amber-500 data-[state=on]:font-semibold"
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="z-20 bg-gray-400 hover:bg-gray-600 rounded-lg w-2">
              <ScrollArea.Thumb className="bg-amber-500 rounded-lg" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </div>
        <div className="flex flex-col w-full justify-center items-center flex-1">
          <button
            disabled={submitDisabled}
            onClick={handleSubmit}
            className="bg-amber-500 text-white p-3 rounded-3xl text-lg font-semibold mt-4 disabled:opacity-30"
          >
            Agendar
          </button>
          <DateTimeField
            className="w-40"
            readOnly
            defaultValue={moment()}
            value={appointmentTime}
            ampm={false}
            sx={{
              '.MuiInputBase-root': {
                color: 'white',
              },
              '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
        </div>
        <div className="flex">
          <DateCalendar
            disablePast
            onChange={handleChangeDate}
            value={date}
            className="bg-gray-600"
            views={['month', 'day']}
            sx={{
              '& .MuiButtonBase-root': {
                color: 'white',
              },
              '& .MuiDayCalendar-weekDayLabel': {
                color: 'white',
              },
              '& .MuiButtonBase-root.Mui-selected': {
                backgroundColor: 'orange !important',
              },
            }}
          />
          <TimeClock
            value={appointmentTime}
            shouldDisableTime={shouldDisableTime}
            minTime={moment('08:00', 'HH:mm')}
            minutesStep={5}
            maxTime={moment('18:00', 'HH:mm').subtract(30, 'minutes')}
            onChange={handleChangeTime}
            ampm={false}
            views={['hours', 'minutes']}
            className="bg-gray-600 flex justify-center"
            showViewSwitcher
            slots={{
              leftArrowIcon: CaretLeft,
              rightArrowIcon: CaretRight,
            }}
            slotProps={{
              leftArrowIcon: {
                fontSize: 'medium',
              },
              rightArrowIcon: {
                fontSize: 'medium',
              },
            }}
            sx={{
              '& .MuiClockNumber-root': {
                color: 'white',
              },
              '& .MuiPickersArrowSwitcher-root': {
                gap: 0.5,
              },
              '& .MuiButtonBase-root': {
                color: 'white',
              },
              '& .MuiClock-clock': {
                backgroundColor: 'slategray',
              },
              '& .MuiClockPointer-root': {
                backgroundColor: 'orange',
              },
              '& .MuiClockPointer-thumb': {
                borderColor: 'orange',
                backgroundColor: 'orange',
              },
              '& .MuiClock-pin': {
                backgroundColor: 'orange',
              },
            }}
          />
        </div>
      </div>
    </main>
  );

  function shouldDisableTime(value: Moment, view: TimeView) {
    const normalizedValue = moment({
      year: value.year(),
      month: value.month(),
      day: value.date(),
      hours: value.hour(),
      minute: value.minute(),
    }).format('YYYY-MM-DD HH:mm');

    if (view === 'minutes') {
      const overlapingSchedules = busySchedulesToday.filter((schedule) => {
        const normalizedSchedule = moment(schedule.appointment_time).format(
          'YYYY-MM-DD HH:mm'
        );

        const sameTime = moment(normalizedSchedule).isSame(normalizedValue);

        const valueBetweenSchedule =
          moment(normalizedValue).isBefore(moment(normalizedSchedule)) &&
          moment(normalizedSchedule).isBefore(
            moment(normalizedValue).add(30, 'minutes')
          );

        const scheduleBetweenValue =
          moment(normalizedSchedule).isBefore(moment(normalizedValue)) &&
          moment(normalizedValue).isBefore(
            moment(normalizedSchedule).add(30, 'minutes')
          );

        return sameTime || valueBetweenSchedule || scheduleBetweenValue;
      });

      const timeOnPast = moment(normalizedValue).isBefore(moment());

      return overlapingSchedules.length > 0 || timeOnPast;
    }

    if (view === 'hours') {
      return moment(normalizedValue).isBefore(moment().startOf('hour'));
    }

    return false;
  }

  async function handleSubmit() {
    await api.post('/appointments', {
      appointment_time: appointmentTime,
      specialty_id: specialty,
      barber_id: barber,
    });
  }

  function loadBusySchedules() {
    api
      .get<Appointment[]>('/appointments/date', {
        params: { date: date?.format('YYYY-MM-DD') },
      })
      .then((response) => {
        setBusySchedulesToday(response.data);
      });
  }

  function loadBarbers() {
    api.get<Barber[]>('/barbers').then((response) => {
      setBarbers(response.data);
    });
  }

  function loadSpecialties() {
    api.get<Specialty[]>('/specialties').then((response) => {
      setSpecialties(response.data);
    });
  }

  function handleChangeDate(date: Moment | null) {
    setDate(date);
  }

  function handleChangeTime(
    time: Moment | null,
    selectionState: PickerSelectionState | undefined
  ) {
    setTime(time);
    if (selectionState === 'finish') {
      setIsTimeChoose(true);
    } else {
      setIsTimeChoose(false);
    }
  }

  function handleChangeSpecialty(value: string) {
    setSpecialty(value);
  }

  function handleChangeProfessional(value: string) {
    setBarber(value);
  }
}
