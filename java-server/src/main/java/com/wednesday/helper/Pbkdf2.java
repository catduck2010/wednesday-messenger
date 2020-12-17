package com.wednesday.helper;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.nio.charset.Charset;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class Pbkdf2 {
    private static final Logger logger = LoggerFactory.getLogger(Pbkdf2.class);
    public static final String algorithm = "pbkdf2_sha256";

    public static final int DEFAULT_ITERATIONS = 777689;        //迭代次数


    /**
     * 获取密文
     *
     * @param password   密码明文
     * @param salt       加盐
     * @param iterations 迭代计数
     * @return
     */
    private static String getEncodedHash(String password, String salt, int iterations) {
        // Returns only the last part of whole encoded password
        SecretKeyFactory keyFactory = null;
        try {
            keyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        } catch (NoSuchAlgorithmException e) {
            logger.error("Could NOT retrieve PBKDF2WithHmacSHA256 algorithm", e);
        }
        KeySpec keySpec = new PBEKeySpec(password.toCharArray(), salt.getBytes(Charset.forName("UTF-8")), iterations, 256);
        SecretKey secret = null;
        try {
            secret = keyFactory.generateSecret(keySpec);
        } catch (InvalidKeySpecException e) {
            logger.error("Could NOT generate secret key", e);
        }
        byte[] rawHash = secret.getEncoded();
        byte[] hashBase64 = Base64.getEncoder().encode(rawHash);

        return new String(hashBase64);
    }

    /**
     * 密文加盐
     *
     * @return String
     */
    private static String getSalt() {
        int length = 12;
        Random rand = new Random();
        char[] rs = new char[length];
        for (int i = 0; i < length; i++) {
            int t = rand.nextInt(3);
            if (t == 0) {
                rs[i] = (char) (rand.nextInt(10) + 48);
            } else if (t == 1) {
                rs[i] = (char) (rand.nextInt(26) + 65);
            } else {
                rs[i] = (char) (rand.nextInt(26) + 97);
            }
        }
        return new String(rs);
    }

    /**
     * rand salt
     * iterations is default 20000
     *
     * @param password
     * @return
     */
    public static String encode(String password) {
        return encode(password, getSalt());
    }

    /**
     * rand salt
     *
     * @param password
     * @return
     */
    public static String encode(String password, int iterations) {
        return encode(iterations, getSalt(), password);
    }

    /**
     * iterations is default 20000
     *
     * @param password
     * @param salt
     * @return
     */
    public static String encode(String password, String salt) {
        return encode(DEFAULT_ITERATIONS, salt, password);
    }

    /**
     * @param password   密码明文
     * @param salt       加盐
     * @param iterations 迭代计数
     * @return
     */
    @Deprecated
    public static String encode(String password, String salt, int iterations) {
        // returns hashed password, along with algorithm, number of iterations and salt
        String hash = getEncodedHash(password, salt, iterations);
        return String.format("%s$%d$%s$%s", algorithm, iterations, salt, hash);
    }

    /**
     * @param password   密码明文
     * @param salt       加盐
     * @param iterations 迭代计数
     * @return
     */
    public static String encode(int iterations, String salt, String password) {
        // returns hashed password, along with algorithm, number of iterations and salt
        String hash = getEncodedHash(password, salt, iterations);
        return String.format("%d$%s$%s", iterations, salt, hash);
    }

    /**
     * 校验密码是否合法
     *
     * @param password       明文
     * @param hashedPassword 密文
     * @return
     */
    public static boolean verification(String password, String hashedPassword) {
        // hashedPassword consist of: ALGORITHM, ITERATIONS_NUMBER, SALT and
        // HASH; parts are joined with dollar character ("$")
        String[] parts = hashedPassword.split("\\$");
        if (parts.length != 3) {
            // wrong hash format
            return false;
        }
        Integer iterations = Integer.parseInt(parts[1]);
        String salt = parts[2];
        String hash = encode(iterations, salt, password);
        return hash.equals(hashedPassword);
    }

}
