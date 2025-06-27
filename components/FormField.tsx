import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {FormControl, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

interface FormFieldProps<T extends FieldValues>{
    control: Control<T>
    name: Path<T>
    label: string;
    placeholder: string;
    type?: 'text' | 'email' | 'password' | 'file'
}

const FormField = ({name, label, type = 'text', control, placeholder}: FormFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({field}) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input type={type} placeholder={placeholder} className='input' {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )} />
)
export default FormField
