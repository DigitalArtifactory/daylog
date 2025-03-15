import { OTPInput, SlotProps } from 'input-otp';

export type OTPInputWrapperType = {
  onChange: (value: string) => void;
};

export default function OTPInputWrapper({ ...props }: OTPInputWrapperType) {
  return (
    <OTPInput
      maxLength={6}
      containerClassName="w-full"
      onChange={(value) => props.onChange(value)}
      render={({ slots }) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          {slots.slice(0, 3).map((s, idx) => (
            <Slot key={idx} {...s}></Slot>
          ))}
          <div>-</div>
          {slots.slice(3).map((s, idx) => (
            <Slot key={idx} {...s}></Slot>
          ))}
        </div>
      )}
    />
  );
}

const Slot = (props: SlotProps) => {
  return (
    <div className="d-flex h-3 border py-3 w-4 justify-content-center align-items-center rounded">
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
};
