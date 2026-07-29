import React, { createContext, useState, useEffect } from 'react';
import api from '..services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
export const useAuth = () => React.useContext(AuthContext);

