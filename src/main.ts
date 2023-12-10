import { ANSIEscSeqHelper } from './ANSIEscSeqHelper';
import { PromptHelper } from './PromptHelper';

export async function main(): Promise<void> {
  const clearLoading = ANSIEscSeqHelper.spin();
  setTimeout(async () => {
    clearLoading();
    console.log(await PromptHelper.askConfirm('aaaaaaaa?'));
    return void ;
  }, 1000);
}
