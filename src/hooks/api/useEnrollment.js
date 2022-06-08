import useAsync from '../useAsync';
import useToken from '../useToken';
import * as enrollmentApi from '../../services/enrollmentApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function useEnrollment() {
  const token = useToken();

  const {
    data: enrollment,
    loading: enrollmentLoading,
    error: enrollmentError,
    act: getEnrollment,
  } = useAsync(() => enrollmentApi.getPersonalInformations(token), false);

  useEffect(async () => {
    try {
      await getEnrollment();
    } catch (error) {
      if (error.response?.status !== 404) toast('Não foi possível carregar seu ingresso');
    }
  }, []);

  return {
    enrollment,
    enrollmentLoading,
    enrollmentError,
    getEnrollment,
  };
}
