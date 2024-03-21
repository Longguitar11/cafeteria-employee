import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button, buttonVariants } from '../ui/button';
import { Props } from './AlertDialogCustom.models';

const AlertDialogCustom = (props: Props) => {
  const { className = '', buttonTitle, alertTitle, onSubmit } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='capitalize'>
          {buttonTitle}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn{' '}
            <span className='lowercase'>
              {buttonTitle} {alertTitle}
            </span>
            ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Thao tác này không thể hoàn tác. Bạn vẫn muốn tiếp tục chứ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Quay lại</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={onSubmit}
          >
            Đồng ý
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogCustom;
