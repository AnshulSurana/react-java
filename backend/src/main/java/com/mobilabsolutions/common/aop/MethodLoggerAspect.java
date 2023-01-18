package com.mobilabsolutions.common.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Aspect
@Component
public class MethodLoggerAspect {

    Logger logger = LoggerFactory.getLogger(MethodLoggerAspect.class);

    @Around("execution(* com.mobilabsolutions.service.*.*(..))")
    public Object logServices(ProceedingJoinPoint point) throws Throwable {
        String methodName = point.getSignature().getName();
        Object[] args = point.getArgs();

        if (args.length > 0)
            logger.info("Entering function {} with parameters: ({}).", methodName, args);

        else
            logger.info("Entering function {}.", methodName);

        Object result = point.proceed();
        Signature signature = point.getSignature();
        Class returnType = ((MethodSignature) signature).getReturnType();

        if (!Objects.equals(returnType,Void.TYPE))
            logger.info("Exiting function {} with output: ({}).", methodName, result);

        else
            logger.info("Exiting function {}.", methodName);

        return result;
    }
}
