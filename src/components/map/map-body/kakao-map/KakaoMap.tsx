import { Button } from '@/components/ui/button';
import Skeleton from '@/components/ui/skeleton';
import useKakaoLoader from '@/hooks/client/map/kakao-map/useKakaoLoader';
import useKakaoMap from '@/hooks/client/map/kakao-map/useKakaoMap';
import { useModal } from '@/hooks/client/ui/useModal';
import useAuthStore from '@/store/auth/auth-store';
import useMap_PetStore from '@/store/map/user-info/userInfo-store';
import { I_PetInfo } from '@/types/map/pet-info/pet-info';
import { LocateFixed, MapPin } from 'lucide-react';
import { CSSProperties, Fragment } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import { refinePetInfo } from '../../utility/form-utils';
import CustomMarker from './custom-marker/CustomMarker';

const MAP_STYLE: CSSProperties = { width: '1264px', height: '640px', position: 'relative', overflow: 'hidden' };
const INITIAL_ZOOM = 3;

const KakaoMap = () => {
  const {
    handleDragEndMap,
    kakaoMapHandler,
    markers,
    currentPosition,
    currentLocation,
    clickMoveToUserLocation,
    clickShowLocationInfo,
  } = useKakaoMap();
  const [loading, error] = useKakaoLoader();
  const { DaengModal } = useModal();
  const pets = useMap_PetStore(state => state.pets) as I_PetInfo[];
  const select_item = refinePetInfo(pets);
  const isLogin = useAuthStore(state => state.isLogin);
  // error || loading시 Skeleton
  if (loading || error) return <Skeleton type="map" />;
  return (
    <div className="relative">
      <Map
        center={currentPosition}
        style={MAP_STYLE}
        level={INITIAL_ZOOM}
        onCreate={kakaoMapHandler}
        onDragEnd={handleDragEndMap}
      >
        <Button
          className="absolute top-3 right-8 z-50  justify-around px-4 w-32 h-12 text-base tracking-wider hover:text-white"
          variant={'auth'}
          onClick={clickMoveToUserLocation}
        >
          내 위치
          <LocateFixed width={20} height={20} />
        </Button>
        {/*onIdle은 맵의 움직임을 동적으로 감지합니다. 따라서 중심좌표의 변경, 줌level등을 동적으로 사용자의 인터렉션에 따라 감지 할수 있습니다. 활용 예시로는 중심좌표가 변화하면 그에 따른 유저가 원하는 location을 중심좌표 주변으로 검색할수 있겠끔 해줄수 있습니다. */}

        {/* 현재 위치 */}
        <CustomOverlayMap position={currentLocation}>
          <MapPin size={48} color="#1f4da8" />
        </CustomOverlayMap>

        {/* location Marker */}
        {markers?.map(marker => {
          return (
            <Fragment>
              <CustomMarker
                onClick={clickShowLocationInfo}
                key={`marker-${marker.id}-${marker.position.lat - marker.position.lng}-${marker.address}`}
                position={marker.position}
              ></CustomMarker>
            </Fragment>
          );
        })}
      </Map>
    </div>
  );
};
export default KakaoMap;
