import { DateCalendar, DateTimeField, TimeClock } from '@mui/x-date-pickers';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import moment, { Moment } from 'moment';
import { useState } from 'react';

export function Scheduling() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [appointmentTime, setAppointmentTime] = useState(moment());
  const [specialty, setSpecialty] = useState<string | undefined>(undefined);
  const [professional, setProfessional] = useState<string | undefined>(
    undefined
  );

  return (
    <main className="bg-gray-900 w-full text-white flex-1">
      <div className="max-w-screen-xl mx-auto px-4 py-8 h-full flex flex-col justify-between">
        <div className="flex gap-16 max-h-[35vh]">
          <ScrollArea.Root className="overflow-hidden">
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
                {items.map((item) => (
                  <ToggleGroup.Item
                    className="bg-slate-600 p-2 rounded-3xl data-[state=on]:bg-amber-500 data-[state=on]:font-semibold"
                    key={item}
                    value={item.toString()}
                  >
                    Teste {item}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="z-20 bg-gray-400 hover:bg-gray-600 rounded-lg w-2">
              <ScrollArea.Thumb className="bg-amber-500 rounded-lg" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
          <ScrollArea.Root className="overflow-hidden">
            <h2 className="text-center text-xl mb-6 font-bold">Profissional</h2>
            <ScrollArea.Viewport className="w-full h-full flex after:content-[''] after:absolute after:bg-gradient-to-b after:from-transparent after:to-gray-900 after:bottom-0 after:z-10 after:h-6 after:w-full">
              <ToggleGroup.Root
                type="single"
                onValueChange={handleChangeProfessional}
                value={professional}
                aria-label="Especialidade"
                className="mb-6 pb-12 flex gap-4 flex-wrap justify-center"
              >
                {items.map((item) => (
                  <ToggleGroup.Item
                    className="bg-slate-600 p-2 rounded-3xl data-[state=on]:bg-amber-500 data-[state=on]:font-semibold"
                    key={item}
                    value={item.toString()}
                  >
                    Teste {item}
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
        <div className="flex w-full justify-center items-center flex-1">
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
            defaultValue={moment()}
            value={appointmentTime}
            onChange={handleChangeDate}
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
            disablePast
            defaultValue={moment()}
            onChange={handleChangeTime}
            value={appointmentTime}
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

  function handleChangeDate(date: Moment | null) {
    setAppointmentTime((prev) =>
      moment({
        year: date?.year(),
        month: date?.month(),
        day: date?.date(),
        hour: prev.hour(),
        minute: prev.minute(),
      })
    );
  }

  function handleChangeTime(date: Moment | null) {
    setAppointmentTime((prev) =>
      moment({
        year: prev.year(),
        month: prev.month(),
        day: prev.date(),
        hour: date?.hour(),
        minute: date?.minute(),
      })
    );
  }

  function handleChangeSpecialty(value: string) {
    setSpecialty(value);
  }

  function handleChangeProfessional(value: string) {
    setProfessional(value);
  }
}
