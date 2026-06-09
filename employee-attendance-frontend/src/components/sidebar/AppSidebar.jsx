import {
  useState,
} from 'react';

import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Tooltip,
} from '@mui/material';

import {
  Logout,
} from '@mui/icons-material';

import {
  logout,
} from '../../api/authService';

import {
  sidebarConfig,
} from '../../config/sidebarConfig';

import {
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  logoutSuccess,
} from '../../redux/slices/authSlice';

const expandedWidth = 280;
const collapsedWidth = 80;

const AppSidebar = () => {
  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const [expanded, setExpanded] =
    useState(false);

  const user =
    useSelector(
      state =>
        state.auth.user,
    );

  const menuItems =
    sidebarConfig[
    user?.role
    ] || [];

  const handleLogout =
    async () => {
      try {
        await logout();
      } catch (error) {
        console.error(
          error,
        );
      }


      dispatch(
        logoutSuccess(),
      );

      navigate(
        '/login',
      );
    };


  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() =>
        setExpanded(
          true,
        )
      }
      onMouseLeave={() =>
        setExpanded(
          false,
        )
      }
      sx={{
        width:
          expanded
            ? expandedWidth
            : collapsedWidth,
        flexShrink: 0,

        '& .MuiDrawer-paper':
        {
          width:
            expanded
              ? expandedWidth
              : collapsedWidth,

          transition:
            'width 0.3s ease',

          overflowX:
            'hidden',

          boxSizing:
            'border-box',

          background:
            'linear-gradient(180deg,#0f172a 0%,#111827 100%)',

          color:
            '#fff',

          borderRight:
            'none',
        },
      }}
    >
      <Box
        sx={{
          display:
            'flex',

          flexDirection:
            'column',

          height:
            '100%',
        }}
      >
        <Box
          sx={{
            p: 3,
            textAlign:
              'center',
          }}
        >
          {expanded ? (
            <>
              <Typography
                variant="h5"
                fontWeight="bold"
              >
                Employee
              </Typography>

              <Typography
                variant="body2"
                color="gray"
              >
                Attendance Portal
              </Typography>
            </>
          ) : (
            <Typography
              variant="h5"
              fontWeight="bold"
            >
              EA
            </Typography>
          )}
        </Box>

        <Divider />

        <List
          sx={{
            flexGrow: 1,
            mt: 2,
          }}
        >
          {menuItems.map(
            item => (
              <NavLink
                key={
                  item.path
                }
                to={
                  item.path
                }
                end={
                  item.end
                }
                style={{
                  textDecoration:
                    'none',

                  color:
                    'inherit',
                }}
              >
                {({
                  isActive,
                }) => (
                  <Tooltip
                    title={
                      expanded
                        ? ''
                        : item.text
                    }
                    placement="right"
                  >
                    <ListItemButton
                      sx={{
                        mx: 1,
                        mb: 1,

                        borderRadius: 2,

                        justifyContent:
                          expanded
                            ? 'initial'
                            : 'center',

                        backgroundColor:
                          isActive
                            ? '#1976d2'
                            : 'transparent',

                        '&:hover':
                        {
                          backgroundColor:
                            isActive
                              ? '#1976d2'
                              : 'rgba(255, 255, 255, 0.5)',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            '#fff',

                          minWidth:
                            expanded
                              ? 40
                              : 'unset',
                        }}
                      >
                        {
                          item.icon
                        }
                      </ListItemIcon>

                      {expanded && (
                        <ListItemText
                          primary={
                            item.text
                          }
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                )}
              </NavLink>
            ),
          )}
        </List>

        <Box p={2}>
          <Tooltip
            title={
              expanded
                ? ''
                : 'Logout'
            }
            placement="right"
          >
            <Button
              fullWidth={
                expanded
              }
              color="error"
              variant="contained"
              startIcon={
                <Logout />
              }
              onClick={
                handleLogout
              }
              sx={{
                py: 1.2,
                borderRadius: 2,
                minWidth: 0,
              }}
            >
              {expanded &&
                'Logout'}
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Drawer>

  );
};

export default AppSidebar;
