import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bedApi from '../../services/bedApi';

export default function useSaveBed() {
  const token = useToken();

  const {
    loading: saveBedLoading,
    error: saveBedError,
    act: saveBed,
  } = useAsync((data) => bedApi.createBedBooking(token, data), false);

  return {
    saveBedLoading,
    saveBedError,
    saveBed,
  };
}
