import React from 'react';

export enum Clip {
  AddIdentityToGroup = 'Sh4dfGOpoOOHRHQNoxEC',

  CopyAuthenticatorConfigID = 'kxuvQibO5nDhoDrK7KOH',
  CopyClientIDClientSecretAndApplicationID = '832jlMeNFu3Jz4JwVU9Z',

  CreateAPIToken = 'OQge5lspW7TRuqvghZQd',
  CreateApplication = 'KmtiNsx4Z31MkogQdwST',
  CreateIdentity = 'TufU7NgJYWOvNSDfuo9j',
  CreatePasskey = 'Y0eBYYISHT8KxVwkSDpo',
  CreateRealm = 'eyWvI91g13J7qj5vmCfD',

  FindTenantID = 'MImNGHws6Y2EpwIPrtPl',

  GettingStartedDemoApp = '6kUN385qBx2Jju7wugbM',
}

/**
 * Example Usage:
 *
 * import Arcade, {Clip} from '@site/src/components/Arcade.tsx';
 * <Arcade clip={Clip.CreateRealm} />
 *
 * Note:
 * clip must be one of the Clip enums above.
 */

interface ArcadeProps {
  clip: Clip;
}

const Arcade: React.FC<ArcadeProps> = ({ clip }) => {
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: 'calc(73% + 20px)',
        height: '0',
      }}
    >
      <iframe
        src={`https://demo.arcade.software/${clip}?embed&forceNoOpeningAnimation=true`}
        frameBorder="0"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
        }}
      ></iframe>
    </div>
  );
};

export default Arcade;
