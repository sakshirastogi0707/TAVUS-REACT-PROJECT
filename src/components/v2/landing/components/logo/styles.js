export const styles = theme => ({
    cropContainer: {
      position: 'relative',
      width: '100%',
      height: 200,
      background: '#333',
      [theme.breakpoints.up('sm')]: {
        height: 400,
      },
    },
    cropButton: {
      flexShrink: 0,
      marginLeft: 16,
    },
    controls: {
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    sliderContainer: {
      display: 'flex',
      flex: '1',
      alignItems: 'center',
    },
    sliderLabel: {
      [theme.breakpoints.down('xs')]: {
        minWidth: 65,
        
      },
      color:'#fff',
      fontFamily: 'Satoshi Variable',
      fontWeight: 400,
      fontSize:' 14px',
    },
    slider: {
      padding: '22px 0px',
      color:'#fff',
      marginLeft: 16,
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: '0 16px',
      },
    },
  })
  