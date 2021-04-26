import { makeStyles } from '@material-ui/core/styles';

export const defaultStyle = makeStyles(theme => ({
  root: {
    flexDirection: 'column',
    '& .ant-empty-img-1': {
      fill: '#262626',
    },
    '& .ant-empty-img-2': {
      fill: '#595959',
    },
    '& .ant-empty-img-3': {
      fill: '#f0f0ff',
    },
    '& .ant-empty-img-4': {
      fill: '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: '0.08',
      fill: '#f0f0ff',
    },
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));

export const OverlayDimensions = {
  width: 120,
  height: 100,
};
