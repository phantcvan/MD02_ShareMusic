import icons from "./icons"

const { MdOutlineLibraryMusic,RiAdminLine, BsPlayCircle, RiLineChartFill, AiOutlineStar, 
    BsMusicNoteBeamed,RxInfoCircled } = icons
export const sidebarMenu = [
    {
        path: '',
        text: 'Khám phá',
        end: true,
        icons: <BsPlayCircle size={24} />
    },
    {
        path: 'zing_chart',
        text: '#zingchart',
        icons: <RiLineChartFill size={24} />
    },
    // {
    //     path: 'mymusic',
    //     text: 'Thư viện',
    //     icons: <MdOutlineLibraryMusic size={24} />
    // },
    // {
    //     path: 'follow',
    //     text: 'Theo dõi',
    //     icons: <MdOutlineLibraryMusic size={24} />
    // },
    {
        path: 'moi-phat-hanh',
        text: 'Nhạc mới',
        icons: <BsMusicNoteBeamed size={24} />
    },
    {
        path: 'top100',
        text: 'Top 100',
        icons: <AiOutlineStar size={24} />
    },
    {
        path: 'admin',
        text: 'Quản trị hệ thống',
        icons: <RiAdminLine size={24} />
    },
    {
        path: 'user-info',
        text: 'Chỉnh sửa thông tin',
        icons: <RxInfoCircled size={24} />
    },
]

export const searchMenu = [
    {
        path: 'tat-ca',
        text: 'TẤT CẢ',
    },
    {
        path: 'bai-hat',
        text: 'BÀI HÁT',
    },
    {
        path: 'playlist',
        text: 'PLAYLIST/ALBUM',
    },
    // {
    //     path: 'follow',
    //     text: 'Theo dõi',
    //     icons: <MdOutlineLibraryMusic size={24} />
    // },
]
