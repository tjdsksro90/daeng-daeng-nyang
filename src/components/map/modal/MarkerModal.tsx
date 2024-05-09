import { CALENDAR_CATEGORY } from '@/components/calendar/reservation/reservation-type';
import LayoutForm from '@/components/common/form/form-layout/LayoutForm';
import LayoutFormBody from '@/components/common/form/form-layout/layout-form-body/LayoutFormBody';
import LayoutFormHeader from '@/components/common/form/form-layout/layout-form-header/LayoutFormHeader';
import { CardContent } from '@/components/ui/card';
import useModalForm from '@/hooks/client/map/modal-form/useModalFom';
import { I_CustomMarkerProps } from '@/types/map/kakao';
import clsx from 'clsx';
import { Fragment } from 'react';
import Search from '../../../../public/icons/search.svg';
import ScheduleForm from '../form/ScheduleForm';
import { T_ScheduleSchema, scheduleSchema } from '../form/validator/schedule-validator';
interface I_MarkerModalProps {
  marker: I_CustomMarkerProps;
  isLogin: boolean;
}

const MarkerModal = ({ marker, isLogin }: I_MarkerModalProps) => {
  const { form, customSelectDisableDate, select_item, submitHandler } = useModalForm<T_ScheduleSchema>({
    schema: scheduleSchema,
    defaultValues: { place: marker.place, location: marker.address },
  });

  return (
    <LayoutForm
      form={form}
      className={clsx('z-[1]', {
        'absolute right-[46.5rem] top-[16rem]': !isLogin,
        'w-[30rem] absolute right-[30rem] top-[3rem]': isLogin,
      })}
    >
      <LayoutFormHeader title="" descript="" headerCn={{ layoutCn: 'p-5' }} />
      <LayoutFormBody>
        <ScheduleForm onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col gap-10">
          <div>
            <CardContent
              className={clsx('p-0  font-bold', {
                'text-3xl mb-6': isLogin,
                'text-2xl mb-4': !isLogin,
              })}
            >
              {marker.place}
            </CardContent>
            <CardContent
              className={clsx('flex items-center gap-3 font-semibold p-0', {
                'text-2xl': isLogin,
                'text-lg': !isLogin,
              })}
            >
              <Search width={18} height={23} />
              {marker.address}
            </CardContent>
          </div>
          {isLogin && (
            <Fragment>
              <div className="flex justify-around">
                <ScheduleForm.selectBox
                  control={form.control}
                  name="petId"
                  title="나의 펫"
                  placeholder="펫을 선택해주세요"
                  optionCn="z-[501]"
                  labelCn="text-2xl font-semibold"
                  itemCn="w-[10rem]"
                  selectItem={select_item}
                />
                <ScheduleForm.calendar
                  control={form.control}
                  name="date"
                  calendarLabel="일정을 선택해주세요"
                  inputCn="w-[12rem]"
                  className="self-end"
                  itemCn="self-end"
                  customDisable={customSelectDisableDate}
                />
              </div>
              <div className="pl-4">
                <ScheduleForm.radioBox
                  control={form.control}
                  name="category"
                  title="카테고리"
                  labelCn="text-2xl mb-3 inline-block font-semibold"
                  radioItem={CALENDAR_CATEGORY}
                  className="text-lg"
                />
              </div>

              <ScheduleForm.button variant={'more'} className="rounded-xl font-normal py-8">
                일정 등록하기
              </ScheduleForm.button>
            </Fragment>
          )}
        </ScheduleForm>
      </LayoutFormBody>
    </LayoutForm>
  );
};

export default MarkerModal;
// {
//    title : string | null ,
//    content: string | null,
//    place: string,
//    location:string | null
//    date: Date,
//    category: '병원' | '산책' | ' 예방접종'
// }
