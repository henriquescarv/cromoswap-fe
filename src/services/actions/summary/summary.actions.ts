import { commonActions } from "../common/common.actions";
import { requestSummaryProps, setSummaryLoadingProps, setSummaryProps } from "./summary.actions.types";
import { getSummary } from "./summary.request";

const setSummaryLoading = ({ set, loading }: setSummaryLoadingProps) => {
  set((state: any) => ({
    ...state,
    summary: {
      ...state.summary,
      loading,
    }
  }));
};

const setSummary = ({ set, data = null, status = null }: setSummaryProps) => {
  set((state: any) => ({
    ...state,
    summary: {
      ...state.summary,
      loading: false,
      status,
      data,
    },
  }));
};

const requestSummary = async ({ set }: requestSummaryProps) => {
  try {
    setSummaryLoading({ set, loading: true });

    const data = await getSummary();

    setSummary({ set, data, status: 'success' });
  } catch (error: any) {
    setSummaryLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setSummary({ set, status: 'error' });
  }
};

export const summaryActions = {
  request: requestSummary,
};
