import React, { useCallback, useEffect, useState } from 'react';

import UserMention from '../UserMention/UserMention';
import Heading from '../Heading/Heading';

import Form from '../Form/Form';
import InputLabel from '../InputLabel/InputLabel';
import FieldSet from '../FieldSet/FieldSet';
import Input from '../Input/Input';
import Button from '../Button/Button';

import styles from './UserProfileEdit.module.css';

const displayName = 'users.UserProfileEdit.UserMainSettings';

type User = {
  walletAddress: string;
  username: string;
};

interface Props {
  user: User;
}

const UserMainSettings = ({
  user: {
    username,
    walletAddress,
  },
}: Props) => {
  return (
    <>

      <Heading
        appearance={{ theme: 'dark', size: 'medium' }}
        text="Profile"
      />
      <Form
        initialValues={{
          displayName: username || undefined,
          bio: undefined,
          website: undefined,
          location: undefined,
        }}
        onSubmit={() => {}}
      >
        {() => (
          <div className={styles.main}>
            <FieldSet>
              <InputLabel label="Your Wallet" />
              <span className={styles.addressContainer}>
                {walletAddress}
              </span>
            </FieldSet>
            <div className={styles.usernameContainer}>
              <InputLabel label="Unique Username" />
              <UserMention
                username={username || ''}
                data-user-walletaddress={walletAddress}
              />
            </div>
            <FieldSet className={styles.inputFieldSet}>
              <Input
                label="Name"
                name="displayName"
              />
              <Input
                label="Bio"
                name="bio"
              />
              <Input
                label="Website"
                name="website"
              />
              <Input
                label="Location"
                name="location"
              />
            </FieldSet>
            <FieldSet>
              <Button
                type="submit"
                text="Save"
                disabled
              />
            </FieldSet>
          </div>
        )}
      </Form>
    </>
  );
};

UserMainSettings.displayName = displayName;

export default UserMainSettings;
