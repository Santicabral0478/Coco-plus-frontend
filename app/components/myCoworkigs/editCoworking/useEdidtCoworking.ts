import { useUserContext } from '../../context';
import GetCoworkingDetailForAdmin from '@/utils/gets/getCoworkingDetailForAdmisn';
import { useEffect, useState } from 'react';
import PutUpdateCoworking from '@/utils/puts/putUpdateCoworking';
import Swal from 'sweetalert2';
import { Coworking } from '@/utils/types/editCoworking/editInfo/editCoworkingInterfaces';
import { initialCoworking } from '@/utils/constants/editCoworking/editInfo/initialCoworking';
import { useMyCoworkingContext } from '../myCoworkingConstext';

const useEdidtCoworking = ({ id }: { id: string }) => {
  const { Mycoworking, setMyCoworking } = useMyCoworkingContext();
  const { token } = useUserContext();
  const [newInfo, setNewInfo] = useState({});
  const [arrayIdAmenities, setArrayIdAmenities] = useState<string[]>([]);

  const [coworking, setCoworking] = useState<any>(initialCoworking);

  useEffect(() => {
    console.log('coworking', coworking);
    if (coworking.amenities) {
      const arrayIds = coworking.amenities.map((amenity: any) => amenity.id);
      console.log('arrayIds', arrayIds);

      setArrayIdAmenities(arrayIds);
    }
  }, [coworking]);

  useEffect(() => {
    setNewInfo({
      ...newInfo,
      amenitiesIds: arrayIdAmenities,
    });
    console.log('arrayIdAmenities', arrayIdAmenities);
    console.log('newInfo', newInfo);
  }, [arrayIdAmenities]);

  const getData = async () => {
    const coworkingData = await GetCoworkingDetailForAdmin({ id, token });
    console.log(
      'esto es lo que me trae la peticion de coworking',
      coworkingData,
    );

    setCoworking(coworkingData);
    setMyCoworking(coworkingData);
    return coworkingData.status;
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === 'capacity') {
      setCoworking({ ...coworking, [name]: Number(value) });
      setNewInfo({ ...newInfo, [name]: Number(value) });
    } else {
      setCoworking({ ...coworking, [name]: value });
      setNewInfo({ ...newInfo, [name]: value });
    }
  };
  useEffect(() => {
    setNewInfo({
      ...newInfo,
      country: Mycoworking?.country,
      state: Mycoworking?.state,
      city: Mycoworking?.city,
      address: Mycoworking?.address,
      lat: Mycoworking?.lat,
      long: Mycoworking?.long,
    });
  }, [Mycoworking]);

  const handleClick = async () => {
    const result = await Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No'No guardar`,
    });
    if (result.isConfirmed) {
      try {
        const response = await PutUpdateCoworking({ id, newInfo, token });
        await getData();
        console.log(newInfo);

        console.log(response);
        Swal.fire('guardado', '', 'success');
      } catch (error) {
        alert(error.response.data.message);
      }
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info');
      return;
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      const status = await getData();
      if (status === 'pending') {
        Swal.fire({
          title:
            'Este coworking aún no se encuentra activado, diligencie la información de la ubicación y una foto de portada para poder activarlo.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No',
          confirmButtonColor: '#222B2D',
          cancelButtonColor: '#d33',
        });
      }
    };

    checkStatus();
  }, []);
  const onClickActivate = async () => {
    const newInfo = {
      status: 'active',
    };

    const result = await Swal.fire({
      title:
        'deseasActivar el coworking? una vez activado los usuarios podra visualizarlo y solicitar reservaciones',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonColor: '#222B2D',
      cancelButtonColor: '#d33',
    });

    if (result.isConfirmed) {
      try {
        const response = await PutUpdateCoworking({ id, newInfo, token });
        await getData();
        Swal.fire({
          title: 'Coworking activado',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        alert(error.response?.data?.message || 'Error al actualizar el estado');
      }
    }
  };

  return {
    handleClick,
    handleChange,
    coworking,
    setNewInfo,
    newInfo,
    onClickActivate,
    getData,
    arrayIdAmenities,
    setArrayIdAmenities,
  };
};

export default useEdidtCoworking;
