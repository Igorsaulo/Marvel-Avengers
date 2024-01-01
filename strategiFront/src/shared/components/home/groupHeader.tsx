import { Group } from "src/shared/store/useGroupStore";
import Select from 'react-select';

const GroupHeader = (groups: Group[], selectGroup: any) => {
    const options = groups.map((group) => ({
        value: group.id,
        label: group.name
    }));

    const handleGroupSelect = (selectedOption: any) => {
        if (selectedOption && selectedOption.value) {
            const groupId = selectedOption.value;
            selectGroup(groupId);
        }
    };

    return (
        <div className="w-full justify-center flex">
            <Select
                options={options}
                styles={{
                    control: (provided) => ({
                        ...provided,
                        backgroundColor: 'transparent',
                        border: '2px solid #7F7F84',
                        borderRadius: '4px',
                    }),
                    singleValue: (provided, state: any) => ({
                        ...provided,
                        color: state.isSelected ? '#BCBCBC' : '#fffff',
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? '#303030' : '#303030',
                        color: state.isSelected ? '#ffff' : '#8f8f8f',
                    }),
                }}
                onChange={handleGroupSelect}
            />
        </div>
    );
};

export { GroupHeader };