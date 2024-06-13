import { useEffect, useState } from 'react';
import {
  Toolbar,
  DataSearch,
  Page,
  PageContent,
  Grid,
  Button,
  Box,
  Data,
  Text,
  DataTable,
  DataSummary,
} from 'grommet';
import { Folder } from 'grommet-icons';
import * as tokens from 'design-tokens';
import * as rawTokens from 'design-tokens/esm-unresolved';

const ColorPreview = ({ datum }) => (
  <Box pad="medium" round="xsmall" flex={false} background={datum.value} />
);

const DimensionPreview = ({ datum }) =>
  parseInt(datum.value, 10) <= 200 ? (
    <Box
      round="xsmall"
      flex={false}
      background="brand"
      width={datum.value}
      height="36px"
    />
  ) : (
    '--'
  );

const RadiusPreview = ({ datum }) => (
  <Box pad="medium" round={datum.value} flex={false} background="brand" />
);

const BorderPreview = ({ datum }) => (
  <Box
    height="72px"
    width="144px"
    round="xsmall"
    border={{ size: datum.value }}
    flex={false}
  />
);

const WeightPreview = ({ datum }) => (
  <Text size="xlarge" weight={datum.value}>
    Aa
  </Text>
);

const TextPreview = ({ datum }) => <Text size={datum.value}>Hello world</Text>;

const flattenObject = (obj, delimiter = '.', prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0 &&
      !('$value' in obj[k])
    )
      Object.assign(acc, flattenObject(obj[k], delimiter, pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

const Nav = ({ tokens: obj, active, setActive }) =>
  Object.keys(obj).map(key => (
    <>
      <Button
        icon={typeof obj[key] === 'object' ? <Folder /> : undefined}
        label={key === 'base' ? 'primitives' : key}
        align="start"
        justify="start"
        active={active === key}
        onClick={() => setActive(key)}
      />
      {/* the first level in is going to be "hpe", and we want to skip that for nav*/}
      {!('$value' in obj[key].hpe) ? (
        <Box pad={{ horizontal: 'small' }}>
          {Object.keys(obj[key].hpe).map(j => (
            <>
              <Button
                key={j}
                label={j}
                align="start"
                justify="start"
                active={active === `${key}.hpe.${j}`}
                onClick={() => setActive(`${key}.hpe.${j}`)}
              />
              {key === 'base' && typeof obj[key].hpe[j] === 'object' ? (
                <Box pad={{ horizontal: 'small' }}>
                  {Object.keys(obj[key].hpe[j]).map(k => (
                    <Button
                      key={k}
                      label={k}
                      align="start"
                      active={active === `${key}.hpe.${j}.${k}`}
                      onClick={() => setActive(`${key}.hpe.${j}.${k}`)}
                    />
                  ))}
                </Box>
              ) : undefined}
            </>
          ))}
        </Box>
      ) : undefined}
    </>
  ));

const Docs = () => {
  const [active, setActive] = useState(`base.hpe`);
  const [data, setData] = useState([]);

  useEffect(() => {
    let prefix = active.split('.');
    prefix.shift();
    prefix = prefix.join('.');

    let keyPath = `${active}`.split('.');
    let res = tokens;
    keyPath.forEach(key => {
      res = res[key];
    });

    let resRaw = rawTokens;
    let rawKeyPath = `${active}`.split('.');
    // remove extra 'hpe' which rawTokens won't have
    const index = rawKeyPath.indexOf('hpe');
    if (index > -1) {
      // only splice array when item is found
      rawKeyPath.splice(index, 1);
    }
    rawKeyPath.forEach(key => {
      resRaw = resRaw[key];
    });
    const flat =
      typeof res === 'object' ? flattenObject(res, '.', `${prefix}`) : res;
    const flatRaw = flattenObject(resRaw, '.', `${prefix}`);

    const nextData =
      typeof flat === 'object'
        ? Object.keys(flat).map(key => {
            return {
              id: key,
              token: key,
              type: flatRaw[key]?.$type,
              description: flatRaw[key]?.$description,
              value: flat[key],
            };
          })
        : [
            {
              id: active,
              token: active,
              // type: flatRaw[key]?.$type,
              // description: flatRaw[key]?.$description,
              value: flat[active.split('.')[active.length - 1]],
            },
          ];
    setData(nextData);
  }, [active]);

  return (
    <Page kind="full">
      <Grid columns={['medium', 'flex']}>
        <Box pad="medium" background="background-front">
          <Nav tokens={tokens} active={active} setActive={setActive} />
        </Box>
        <PageContent>
          <Box
            pad="medium"
            round="medium"
            background="background-front"
            margin={{ vertical: 'medium' }}
          >
            <Data data={data} pad={{ vertical: 'medium' }}>
              <Toolbar>
                <DataSearch />
              </Toolbar>
              <DataSummary />
              <Box overflow={{ horizontal: 'auto' }}>
                <DataTable
                  columns={[
                    {
                      property: 'id',
                      header: 'Preview',
                      render: datum => {
                        if (datum.type === 'color')
                          return <ColorPreview datum={datum} />;

                        if (
                          datum.token.includes('content') ||
                          datum.token.includes('dimension') ||
                          datum.token.includes('spacing') ||
                          datum.token.includes('gap')
                        )
                          return <DimensionPreview datum={datum} />;
                        if (
                          datum.token.includes('radius') ||
                          datum.token.includes('borderRadius')
                        )
                          return <RadiusPreview datum={datum} />;
                        if (datum.token.includes('border'))
                          return <BorderPreview datum={datum} />;
                        if (
                          datum.token.includes('weight') ||
                          datum.token.includes('fontWeight')
                        )
                          return <WeightPreview datum={datum} />;
                        if (
                          (datum.token.includes('font') &&
                            datum.token.includes('size')) ||
                          datum.token.includes('fontSize')
                        )
                          return <TextPreview datum={datum} />;
                        else return '--';
                      },
                      size: 'auto',
                    },
                    {
                      property: 'token',
                      header: 'Token',
                      render: datum => (
                        <Box direction="row">
                          <Box
                            background="background-contrast"
                            pad="xsmall"
                            round="xsmall"
                            style={{ fontFamily: 'Menlo' }}
                          >
                            <Text size="xsmall">{datum.token}</Text>
                          </Box>
                          {/* <Button icon={<Copy />} size="small" /> */}
                        </Box>
                      ),
                      //   size: 'small',
                    },
                    {
                      property: 'description',
                      header: 'Description',
                      size: 'medium',
                      render: datum => (
                        <Text>
                          {datum.description ? datum.description : '--'}
                        </Text>
                      ),
                    },
                    {
                      property: 'value',
                      header: 'Output value',
                    },
                  ]}
                />
              </Box>
            </Data>
          </Box>
        </PageContent>
      </Grid>
    </Page>
  );
};

export { Docs };
