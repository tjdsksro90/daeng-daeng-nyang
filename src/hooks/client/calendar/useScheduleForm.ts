import { T_ScheduleSchemaBaic } from '@/components/calendar/validator/schedule-validator';
import useScheduleMutationQuery from '@/hooks/server/calendar/useScheduleMutationQuery';
import useScheduleFormStore from '@/store/calendar/form-store';
import { I_CustomUseHookFormProps } from '@/types/form/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';

const useScheduleForm = <T extends FieldValues>({ schema, defaultValues }: I_CustomUseHookFormProps<T>) => {
  const form = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { addSchedule } = useScheduleMutationQuery({ form });
  const scheduleFormDateStore = useScheduleFormStore(state => state.date);

  const submitHandler = async (value: T_ScheduleSchemaBaic) => {
    const changeValueTarget = {
      petId: value.petId,
      category: value.category,
      title: value.title,
      content: value.content,
      date: scheduleFormDateStore + 'T' + value.hour + ':' + value.minutes + ':00',
      place: value.place,
      location: '',
    };
    // console.log(changeValueTarget);
    addSchedule(changeValueTarget);
  };

  return { form, submitHandler };
};

export default useScheduleForm;
