import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { LocalizeText } from '../../../../api';
import { Button } from '../../../../common/Button';
import { Flex } from '../../../../common/Flex';
import { SearchFilterOptions } from '../../common/SearchFilterOptions';
import { useNavigatorContext } from '../../NavigatorContext';

export interface NavigatorSearchViewProps
{
    sendSearch: (searchValue: string, contextCode: string) => void;
}

export let LAST_SEARCH: string = null;

export const NavigatorSearchView: FC<NavigatorSearchViewProps> = props =>
{
    const { sendSearch = null } = props;
    const [ searchFilterIndex, setSearchFilterIndex ] = useState(0);
    const [ searchValue, setSearchValue ] = useState('');
    const [ lastSearchQuery, setLastSearchQuery ] = useState('');
    const { navigatorState = null } = useNavigatorContext();
    const { topLevelContext = null, searchResult = null } = navigatorState;

    const processSearch = useCallback(() =>
    {
        if(!topLevelContext) return;

        let searchFilter = SearchFilterOptions[searchFilterIndex];

        if(!searchFilter) searchFilter = SearchFilterOptions[0];

        const searchQuery = ((searchFilter.query ? (searchFilter.query + ':') : '') + searchValue);

        if(lastSearchQuery === searchQuery) return;

        setLastSearchQuery(searchQuery);
        sendSearch((searchQuery || ''), topLevelContext.code);
    }, [ lastSearchQuery, searchFilterIndex, searchValue, topLevelContext, sendSearch ]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) =>
    {
        if(event.key !== 'Enter') return;

        processSearch();
    };

    useEffect(() =>
    {
        if(!searchResult || !searchResult.data) return;
        
        const searchResultDataParts = searchResult.data.split(':');

        LAST_SEARCH = `${ topLevelContext.code }/${ searchResult.data }`;

        if(searchResultDataParts.length === 2)
        {
            let searchFilterIndex = SearchFilterOptions.findIndex(option => (option.query === searchResultDataParts[0]));

            if(searchFilterIndex > -1) setSearchFilterIndex(searchFilterIndex);
            setSearchValue(searchResultDataParts[1]);
        }
    }, [ searchResult, topLevelContext ]);

    return (
        <Flex fullWidth gap={ 1 }>
            <Flex shrink>
                <select className="form-select form-select-sm" value={ searchFilterIndex } onChange={ event => setSearchFilterIndex(parseInt(event.target.value)) }>
                    { SearchFilterOptions.map((filter, index) =>
                    {
                        return <option key={ index } value={ index }>{ LocalizeText('navigator.filter.' + filter.name) }</option>
                    }) }
                </select>
            </Flex>
            <Flex fullWidth gap={ 1 }>
                <input type="text" className="form-control form-control-sm" placeholder={ LocalizeText('navigator.filter.input.placeholder') } value={ searchValue }  onChange={ event => setSearchValue(event.target.value) } onKeyDown={ event => handleKeyDown(event) } />
                <Button variant="primary" onClick={ processSearch }>
                    <FontAwesomeIcon icon="search" />
                </Button>
            </Flex>
        </Flex>
    );
}
